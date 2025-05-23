export default async function page({
  params,
}: {
  params: Promise<{ catchAll: (number | string)[] }>;
}) {
  const resolvedparams = await params;
  const catchAll = resolvedparams.catchAll;

  return <div>Blog Page {JSON.stringify(catchAll)}</div>;
}
