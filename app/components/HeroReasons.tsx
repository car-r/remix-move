export default function HeroReasons() {
    return (
        <div className="flex flex-col mx-auto">
            <p className="mt-12 text-center font-light text-lg">Muver takes the stress and hassle away from moving to your new home. Organize your things and place them in their box. Label each box and categorize them by room.</p>
            <div className="my-12 grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
                <div className="flex flex-col bg-neutral-100/50 p-4 rounded-lg max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="mb-4">Organize your move by making a digital twin of your home, room by room.</p>
                    <h3 className="text-xl mt-auto font-bold">Get organized</h3>
                </div>
                <div className="flex flex-col bg-neutral-100/50 p-4 rounded-lg max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <p className="mb-4 ">Manage your move and keep track of all of your boxes.</p>
                    <h3 className="text-xl mt-auto font-bold">Manage your move</h3>
                </div>
                <div className="flex flex-col bg-neutral-100/50 p-4 rounded-lg max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="mb-4">Log each item and keep track of which box they're in, making unpacking a breeze.</p>
                    <h3 className="text-xl mt-auto font-bold">Find your things</h3>
                </div>
            </div>
        </div>
    )
}