import Card from "../components/Card";
import NavBar from "../components/NavBar";

export default function Profile() {
    return (
        <>
            <NavBar />
            <div className="bg-gray-200 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <Card className="p-5">yip yap</Card>
                </main>
            </div>
        </>
    );
}
