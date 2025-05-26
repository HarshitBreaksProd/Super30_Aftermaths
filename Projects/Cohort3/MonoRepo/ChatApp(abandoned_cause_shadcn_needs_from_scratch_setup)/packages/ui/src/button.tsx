"use client";
interface ButtonProps {
  variant?: "primary" | "secondary";
  onclick: () => void;
}

export function Button(props: ButtonProps) {
  let variantClassname = "";

  return (
    <button
      className="bg-black text-white border p-2 rounded-lg cursor-pointer"
      onClick={() => props.onclick()}
    >
      Hello
    </button>
  );
}
