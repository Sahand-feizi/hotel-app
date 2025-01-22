import { useEffect } from "react";

export default function useOutsideClick(ref, exeptionID, cb) {
    useEffect(() => {
        function handlerOutsideClick(e) {
            console.log(e.target);
            if(
                ref.current && 
                !ref.current.contains(e.target) &&
                e.target.id !== exeptionID
            ) {
                cb()
            }
        }

        document.addEventListener('mousedown', handlerOutsideClick)
    },[ref])
}