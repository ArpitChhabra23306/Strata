import { createClient } from "@/lib/client";
const supabase = createClient();

export default function Auth() {

    async function login(provider: "google" | "github") {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider
        });

        if (error) {
            console.error("Error signing in:", error.message);
        }
        else {
            console.log("Signed in successfully:", data);
        }

    }


    return (
        <>
            <button onClick={() => login("google")}>Login with Google</button>
            <button onClick={() => login("github")}>Login with Github</button>
        </>
    );
}
