// 'use client'; // needed for custom ToastBar (for animation change)

import { Toaster, ToastBar } from 'react-hot-toast';

//toaster for custom alerts
export default function MyToaster() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                success: {
                    duration: 5000,
                    style: {
                        background: 'white',
                        border: '2px solid #000000',
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        background: 'white',
                        border: '2px solid #000000',
                    },
                },
            }}
        >
            {/* {(t) => {
                return (<ToastBar
                    toast={t}
                    style={{
                        ...t.style,
                        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 30s ease',
                    }}
                />)
         }} */}
        </Toaster>
    );
}
