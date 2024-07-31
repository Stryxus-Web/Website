export function astroLoad() {
    const email = document.getElementById('email')?.innerText;
    document.getElementById('copy-email')?.addEventListener('click', async () => {
        if (email) {
            try {
                await navigator.clipboard.writeText(email);
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert(`Failed to copy: ${err}`);
            }
        }
    });
}
