//== general imports
import { FC, useRef } from "react";
//== general imports

//== style imports
import "./StatusChangeBox.scss"
//== style imports

//== TypeScript interface
interface Props {
   formData: any,
   nameUpdate: any,
   setNameChangeMode: any,
}
//== TypeScript interface


export const StatusChangeBox: FC<Props> = ({
   formData, nameUpdate, setNameChangeMode }) => {
   //== links to DOM elements
   const nameInput: any = useRef(null)
   //== links to DOM elements

   //== methods
   const nameUpdateHandle = () => {
      const newName = nameInput.current.value
      nameUpdate(newName)
      setNameChangeMode(false)
   }

   const nameUpdateHandleOnKey = (event: any) => {
      if (event.key === "Enter") {

         const newName = nameInput.current.value
         nameUpdate(newName)
         setNameChangeMode(false)
      }
   }

   const nameChangeModeHandle = () => {
      setNameChangeMode(false)
   }
   //== methods

   //== JSX
   return <div className="status-change-wrapper">
      <input type="text"
         className="name-input"
         required
         title="Введите Ваше имя"
         defaultValue={formData.name}
         name="name"
         onKeyPress={nameUpdateHandleOnKey}
         ref={nameInput} />

      <button type="button" className="accept-button" onClick={nameUpdateHandle}>✔</button>
      <button type="button" className="close-button" onClick={nameChangeModeHandle}>✗</button>
   </div>
   //== JSX
}