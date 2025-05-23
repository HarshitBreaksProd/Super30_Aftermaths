const page = async ({
  params,
}: {
  params: Promise<{ id: (number | string)[] }>;
}) => {
  const idArray = (await params).id;

  return (
    <div>
      Handles both the /info base route and /info/[...id] array (catch all)
      routes
      <div>{idArray ? <>IdArray - {JSON.stringify(idArray)}</> : <></>}</div>
    </div>
  );
};

export default page;
