import { useInView } from 'react-intersection-observer';
import { useActiveSectionContext } from '@src/context/active-section-context';
import { Section } from '@src/constants/home/section-data';
import { useEffect } from 'react';
// import { SectionName } from './types';

//sets active section in header when user scrolls to it manually
export function useSectionInView(sectionName : Section, threshold = 0.75) {
    const { ref, inView } = useInView({
        threshold //when threshold*100% of the element (corresponding to ref) is in view
    });
    const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

    //when you want to synchronize state with an external system you use useEffect
    //does not get rendered (it would if not inside useEffect)
    useEffect(() => {
        if (inView && Date.now() - timeOfLastClick > 1000) {
            setActiveSection(sectionName);
        }
    }, [inView, timeOfLastClick, sectionName, setActiveSection])

    return {
        ref,
    }
}