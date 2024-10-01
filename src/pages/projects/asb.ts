import { WebUsbTransport, AdbClient, type KeyStore, type Options, Message, MessageHeader } from "modules/wadb/src";
import { WebUSBDevice } from "~/lib/standards/webusb";
import init, { } from "~/modules/Android-System-Bridge/pkg/asb";

// TODO: Convert as much of this as possible to Rust WASM, slowly but surely as I learn Rust.

let asbWasm: any;
let device: WebUSBDevice | undefined;
let adbClient: AdbClient | undefined;
const options: Options = { 
    debug: false, 
    useChecksum: false, 
    dump: false, 
    keySize: 2048 
};

export async function astroLoad() {
    document.getElementById("connectButton")?.addEventListener("click", async () => {
        await initWasm();
        /*
        device = new WebUSBDevice();
        if (await device.connect()) {

        }
        */

        try {
            await connectADB();
            console.log("Connected to ADB");
            
            console.log("Install app:", await executeADBCommand("install", "/path/to/app.apk"));
            console.log("Push file:", await executeADBCommand("push", "local/file.txt", "/sdcard/file.txt"));
            //console.log("Pull file:", await executeADBCommand("pull", "/sdcard/file.txt", "local/file.txt"));
            console.log("Uninstall app:", await executeADBCommand("uninstall", "com.example.app"));
            //console.log("Reboot device:", await executeADBCommand("reboot"));                
        } catch (error) {
            console.error("ADB connection failed:", error);
        }
    });
}

async function connectADB() {
    const transport = await WebUsbTransport.open(options);
    const keyStore: KeyStore = {
        loadKeys: async () => {
            // Implement loading keys from storage
            return [];
        },
        saveKey: async (key: CryptoKeyPair) => {
            // Implement saving key to storage
        }
    };

    adbClient = new AdbClient(transport, options, keyStore);
    await adbClient.connect();

    console.log("ADB connection established");
}

async function executeADBCommand(command: string, ...args: any[]): Promise<any> {
    if (!adbClient) {
        throw new Error("ADB not connected");
    }
    
    switch (command) {
        case 'install':
            return await sendShellCommand(`pm install ${args[0]}`);
        case 'uninstall':
            return await sendShellCommand(`pm uninstall ${args[0]}`);
        case 'push':
            //await adbClient.push(localPath, remotePath);
            return `File pushed from ${args[0]} to ${args[1]}`;
        case 'pull':
            const data = await adbClient.pull(args[0]);
            // Assuming data is a Blob, we need to save it to the local file system
            // This is a simplified example and may need to be adjusted based on your environment
            const arrayBuffer = await data.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            // You'll need to implement a function to write the Uint8Array to a file
            //await writeFileAsync(localPath, uint8Array);
            return `File pulled from ${args[0]} to ${args[1]}`;
        //case 'reboot':
            //return await sendShellCommand('reboot');
        default:
            return await sendShellCommand(command + ' ' + args.join(' '));
    }
}

async function sendShellCommand(command: string): Promise<string> {
    if (!adbClient) {
        throw new Error("ADB not connected");
    }
    
    console.log(`Sending shell command: ${command}`);
    const result = await adbClient.shell(command);
    console.log(`Shell command result: ${result}`);
    return result;
}

async function initWasm() {
    if (!asbWasm) {
        asbWasm = await (await import("~/modules/Android-System-Bridge/pkg/asb")).default();
    }
    return asbWasm;
}
