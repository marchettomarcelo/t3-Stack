import { signIn, useSession } from "next-auth/react";

export default function ProtectedPage({ Page }: any) {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={() => signIn()}
      >
        {"Sign in"}
      </button>
    );
  } else {
    return <Page />;
  }
}
