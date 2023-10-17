import Swal from "sweetalert2";

export default function SweetAlert(type,msg) {
  return Swal.fire({
    position:"top-end",
    icon:type,
    showConfirmButton:false,
    timer:3000,
    toast:true,
    title:msg
  })
}

export  function SweetAlert2(type,msg,text) {
  return Swal.fire({
    // position:"top-end",
    // timer:3000,
    // toast:true,
    title:msg,
    text:text,
    icon:type,
  })
}