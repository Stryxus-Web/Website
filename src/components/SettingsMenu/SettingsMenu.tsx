import "./SettingsMenu.sass"

import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SettingsMenu () {
    return (
        <div id="settings-menu">
            <h1>Settings</h1>
            <hr />
            <h2>General</h2>
            <label>
                <small>Battery Saver Mode (Not yet implemented)</small>
                <input type="checkbox" checked={false} />
                <span class="checkmark"></span>
                <small>Battery Saver Mode will prevent intensive operations from being performance and will block certain pages from loading.</small>
            </label>
            <label>
                <small>Data Saver Mode (Not yet implemented)</small>
                <input type="checkbox" checked={false} />
                <span class="checkmark"></span>
                <small>Data Saver Mode will minimise the amount of downloads for certain experiences and will block access to certain user downloads like photos from the photography page.</small>
            </label>
            <label>
                <small>Data Saver Mode (Not yet implemented)</small>
                <input type="checkbox" checked={false} />
                <span class="checkmark"></span>
                <small>Data Saver Mode will minimise the amount of downloads for certain experiences and will block access to certain user downloads like photos from the photography page.</small>
            </label>
            <p>

            </p>
            <a class="row" rel="noopener noreferrer nofollow" href="https://github.com/Stryxus/Website">
                <i class="fa-brands fa-github"></i>
                <small>Stryxus/Website</small>
            </a>
            <h2>Git Commits (Last 100) (UTC Time)</h2>
            <small>Updates every hour</small>
            <hr />
            <a id="bmac" rel="noopener noreferrer nofollow" target="_blank" href="https://www.buymeacoffee.com/Stryxus">
                <img src="https://img.buymeacoffee.com/button-api/?text=Want to support my work?&emoji=&slug=Stryxus&button_colour=003c05&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" />
            </a>
        </div>
    )
}
