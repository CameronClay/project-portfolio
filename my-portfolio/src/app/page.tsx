import Contact from '@src/components/sections/contact';
import Intro from '@src/components/sections/intro';
import Projects from '@src/components/sections/projects';
import SectionDivider from '@src/components/section-divider';
import Skills from '@src/components/sections/skills';
// import Experience from '@src/components/experience';

export default function Home() {
	return (
		<main className='flex flex-col items-center pl-[1rem] pr-[1rem]'>
			<Intro />
			<SectionDivider />
			<Projects />
			<Skills />
			{/* <Experience /> */}
			<Contact />
		</main>
	);
}