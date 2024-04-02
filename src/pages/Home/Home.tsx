import './Home.sass'

import Home_BackMain from '../../assets/img/home/background.png';
import Img_Cutout from '../../assets/img/cutout.png';

export default function Home() {
	return (
		<div id="page-home" class="page row justify-content-center align-items-center">
			<div class="col">
				<div class="section f-h row justify-content-center" style={`background-image: url('${Home_BackMain}')`}>
					<div id="welcome-text" class="col col-md-5">
						<div class="row justify-content-end align-items-end">
							<div id="welcome-text-inner" class="col-12 col-lg-auto">
								<h1>Connor 'Stryxus' Shearer</h1>
								<br />
								<h3>"The Phantom Sharp Eye" - Normally just "Sharp Eye"</h3>
								<br />
								<h3>"Lonewolf Tactician"</h3>
								<br />
								<h3>"Technical Magician"</h3>
								<br />
								<h3>"Heavily Eidetic and Photographic Minded"</h3>
							</div>
						</div>
					</div>
					<div id="avatar-cutout-container" class="col-12 col-md-6 align-self-end">
						<img id="avatar-cutout" src={Img_Cutout} alt="Avatar" />
					</div>
				</div>
				<div class="section row">
					<div class="col-12 col-lg-6">
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
					<div class="col-12 col-lg-6">
						<div class="row">
							<div class="col">
								<h1>My Programming Languages</h1>
								<hr />
								<small>In Knowledgable Order</small>
								<ul>
									<li><a rel="noopener noreferrer nofollow" href="https://dotnet.microsoft.com/languages/csharp" target="_blank">C#</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://sass-lang.com/" target="_blank">CSS/SCSS/SASS</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.typescriptlang.org/" target="_blank">Javascript/Typescript</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank">C</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://isocpp.org/" target="_blank">C++</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.swift.org/" target="_blank">Swift</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.python.org/" target="_blank">Python</a></li>
								</ul>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<h1>My Tools</h1>
								<hr />
								<ul>
									<li><a rel="noopener noreferrer nofollow" href="https://visualstudio.microsoft.com/vs/" target="_blank">Visual Studio</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://code.visualstudio.com/?wt.mc_id=DX_841432" target="_blank">Visual Studio Code</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://github.com/" target="_blank">Github</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://affinity.serif.com/en-gb/photo/" target="_blank">Affinity Photo 2</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://affinity.serif.com/en-gb/designer/" target="_blank">Affinity Designer 2</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.blackmagicdesign.com/products/davinciresolve/" target="_blank">Davinci Resolve</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.topazlabs.com/topaz-photo-ai" target="_blank">Topaz Labs Photo Ai</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.topazlabs.com/topaz-video-ai" target="_blank">Topaz Labs Video Ai</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.midjourney.com/" target="_blank">Midjourney</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.mozilla.org/firefox/new/" target="_blank">Mozilla Firefox</a></li>
									<li><a rel="noopener noreferrer nofollow" href="https://www.apple.com/safari/" target="_blank">Safari</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
