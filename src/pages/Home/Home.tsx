import "./Home.sass";

import Img_Cutout from "../../assets/img/cutout.png";

export default function Home() {
	return (
		<div id="page-home" class="page justify-content-center align-items-center">
			<div class="section columns-2 gap-6 h-screen">
				<div id="welcome-text" class="flex h-full items-end justify-end">
					<div id="welcome-text-inner" class="w-fit h-fit">
						<h1>Connor "Stryxus" Shearer</h1>
						<br />
						<h2>"The Phantom Sharp Eye" - Normally just "Sharp Eye"</h2>
						<br />
						<h2>"Lonewolf Tactician"</h2>
						<br />
						<h2>"Technical Magician"</h2>
						<br />
						<h2>"Heavily Eidetic and Photographic Minded"</h2>
					</div>
				</div>
				<div id="avatar-cutout-container" class="h-full content-end">
					<img id="avatar-cutout" src={Img_Cutout} alt="Avatar" draggable={false} />
				</div>
			</div>
			<div class="section padded columns-1">
				<div>
					<h1>Who am I and what is my story?</h1>
					<hr />
					<p>
						To be filled in.
					</p>
					<h1>What is my [life] story?</h1>
					<hr />
					<p>
						To be filled in.
					</p>
					<h1>What is the purpose of my personal website?</h1>
					<hr />
					<p>
						To be filled in.
					</p>
					<h1>Can I help you out in any way?</h1>
					<hr />
					<p>
						To be filled in.
					</p>
				</div>
			</div>
		</div>
	);
}
