import { isWebUSBSupported } from "~/lib/standards/webusb";

export enum Perms {
    
}

export async function getPermission(permission: Perms): Promise<boolean> {
    switch (permission) {

        default:
            return false;
    }

    async function generic(permName: PermissionName) {
        try {
            const result = await navigator.permissions.query({ name: permName });
            return `${permission}: ${result.state}`;
        } catch (error) {
            return `${permission} (not supported)`;
        }
    }
}
