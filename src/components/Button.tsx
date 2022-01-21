interface ButtonProps {
   children: any
   className?: string
   color?: string
   onClick?: () => void
}

export default function Button(props: ButtonProps) {
   return (
      <button onClick={props.onClick} className={`
         bg-gradient-to-r from-blue-500 to-blue-600 text-white
         px-4 py-2 rounded-md
         ${props.className}
      `}>
         {props.children}
      </button>
   )
}