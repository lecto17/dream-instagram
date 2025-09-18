// import { redirect } from 'next/navigation';
// import { signIn, providerMap } from '/auth';
// import { AuthError } from 'next-auth';
// import InstagramBorder from '@/components/border/InstagramBorder';
import { getAuthenticatedUser } from '@/actions/action';
import InstagramBorder from '@/components/border/InstagramBorder';
import SignIn from '@/components/sign-in/SignIn';
import { redirect } from 'next/navigation';

// type Props = Promise<{
//   searchParams: { callbackUrl: string | undefined };
// }>;

export default async function SignInPage() {
  const user = await getAuthenticatedUser();
  if (user != null) return redirect('/');

  // export default async function SignInPage({ searchParams }: { searchParams: Props }) {
  // Dynamic APIs are
  // The `params` and `searchParams` props that get provided to pages, layouts, metadata APIs, and route handlers.
  // next15 부터에서는 위 params나 searchParams를 사용하려면 await를 사용해야한다.
  // https://nextjs.org/docs/messages/sync-dynamic-apis

  // const params = await searchParams;
  // const callbackUrl = params?.searchParams?.callbackUrl || '';

  return (
    <section className="mt-[25%] flex justify-center">
      {/* <InstagramBorder className="w-fit p-2 text-2xl font-semibold"> */}

      <SignIn />

      {/* {Object.values(providerMap).map((provider) => (
          <form
            className="p-[2px]"
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: callbackUrl ?? "",
                });
              } catch (error) {
                console.error(error);
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  // TODO
                  // Error 상태에 따른 차별된 Error page 보여주기
                  return redirect(`${""}?error=${error.type}`);
                }

                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
            }}
          >
            <button type="submit">
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))} */}
      {/* </InstagramBorder> */}
    </section>
  );
}
