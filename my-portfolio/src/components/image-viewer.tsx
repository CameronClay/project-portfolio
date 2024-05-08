'use client';

import React, { WheelEvent, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useImageViewerContext } from '@src/context/home/image-viewer-context';
import { useOutsideClick } from 'outsideclick-react';
import {
    MdOutlineFilterCenterFocus,
    MdOutlineZoomOut,
    MdZoomIn,
} from 'react-icons/md';

function is_overflown(element: HTMLElement) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

export default function ImageViewer() {
    const imageViewerContext = useImageViewerContext();
    const { isVisible } = imageViewerContext;

    const close = () => {
        imageViewerContext.setVisible(false);
    };

    //make click outside of element close it
    const handle_outside_click = (e: HTMLElement) => {
        close();
    };
    const ref = useOutsideClick(handle_outside_click);

    //disable page scroll when element is visible
    useEffect(() => {
        if (imageViewerContext.isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [imageViewerContext.isVisible]);

    const [scale, _setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const set_scale = (scale: number) => {
        _setScale(Math.max(Math.min(10, scale), 0.1));
    };

    const imageRef = useRef<HTMLImageElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const on_zoom_in = () => {
        set_scale(scale + 0.1);
    };
    const on_zoom_out = () => {
        set_scale(scale - 0.1);
    };

    const on_mouse_scroll = (event: WheelEvent<HTMLImageElement>) => {
        set_scale(scale + event.deltaY * 0.00125);
    };

    const on_center_image = () => {
        setPosition({ x: 0, y: 0 });
    };
    const on_reset_image = () => {
        set_scale(1);
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const image = imageRef.current;
        let isDragging = false;
        let prevPosition = { x: 0, y: 0 };

        const onMouseDown = (event: MouseEvent) => {
            isDragging = true;
            prevPosition = { x: event.clientX, y: event.clientY };
        };

        const onMouseMove = (event: MouseEvent) => {
            if (!isDragging) {
                return;
            }

            const deltaX = event.clientX - prevPosition.x;
            const deltaY = event.clientY - prevPosition.y;
            prevPosition = { x: event.clientX, y: event.clientY };
            setPosition((position) => {
                return { x: position.x + deltaX, y: position.y + deltaY };
            });
        };

        const onMouseUp = (event: MouseEvent) => {
            isDragging = false;
        };

        image?.addEventListener('mousedown', onMouseDown);
        image?.addEventListener('mousemove', onMouseMove);
        image?.addEventListener('mouseup', onMouseUp);
        return () => {
            //return cleanup function
            image?.removeEventListener('mousedown', onMouseDown);
            image?.removeEventListener('mousemove', onMouseMove);
            image?.removeEventListener('mouseup', onMouseUp);
        };
    }, [imageRef, scale, isVisible]);

    useEffect(() => {
        setPosition({ x: 0, y: 0 });
        set_scale(1);
    }, [isVisible]);

    return (
        <div ref={ref} className="">
            {imageViewerContext.isVisible && (
                <div className="fixed left-1/2 -translate-x-1/2 z-50 bg-black overflow-hidden w-[max-content] max-w-[100vw] h-[max-content] max-h-[100vh]">
                    <div className="flex flex-row items-center justify-start w-full h-[2rem] bg-gray-700 px-[0.25rem]">
                        <div className="text-nowrap whitespace-nowrap mx-[0.25rem] my-[0rem] sm:mx-[0.5rem]">
                            <p className="text-2xl font-bold text-white text-opacity-85 dark:text-opacity-70">
                                Image Viewer
                            </p>
                        </div>

                        <div className="flex justify-end w-full pl-[0.25rem]">
                            <button
                                title="Close Image Viewer"
                                onClick={close}
                                className="flex items-center justify-center w-[2rem] h-[2rem] top-[0.5rem] text-gray-900 hover:bg-gray-400"
                            >
                                <IoMdClose size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start w-full h-[2rem] bg-gray-700 mb-[1rem] px-[0.5rem] gap-x-[0.25rem] border-y-[1px] border-gray-400">
                        <button
                            title="Center Image and Reset Scale"
                            onClick={on_reset_image}
                            className="flex text-center items-center justify-center h-full text-5xl text-gray-900 hover:bg-gray-400"
                        >
                            <MdOutlineFilterCenterFocus size={32} />
                        </button>

                        <button
                            title="Zoom In"
                            onClick={on_zoom_in}
                            className="flex text-center items-center justify-center h-full text-5xl text-gray-900 hover:bg-gray-400"
                        >
                            <MdZoomIn size={32} />
                        </button>

                        <button
                            title="Zoom Out"
                            onClick={on_zoom_out}
                            className="flex text-center items-center justify-center h-full text-5xl text-gray-900 hover:bg-gray-400"
                        >
                            <MdOutlineZoomOut size={32} />
                        </button>
                    </div>

                    <div
                        onWheel={on_mouse_scroll}
                        ref={imageContainerRef}
                        className="max-h-[100vh] overflow-hidden"
                    >
                        <img
                            ref={imageRef}
                            src={imageViewerContext.imageSrc}
                            alt={imageViewerContext.imageAlt}
                            fetchPriority="high"
                            className="px-[1rem] pb-[1rem] cursor-move"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            }}
                            draggable={false}
                        ></img>
                    </div>
                </div>
            )}
        </div>
    );
}