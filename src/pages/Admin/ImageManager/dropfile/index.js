import { Outlet } from 'react-router-dom'
import styles from  './drop.module.css'

function Dropfile({updateData,index,name,}){

  const  handleDrop =(e)=>{
    console.log('dropevent',e.dataTransfer.files)
    const validate=['image/jpeg','image/jpg','image/png']
    const files = e.dataTransfer.files;
    files.forEach((item, index) => {
        if(validate.includes(item.type)){
            
        }else{
            alert(`hình ${index+1} không phải là file hình ảnh`)
        }
    });
  }


return(
  <div className={styles.container} ondrop={(e)=>handleDrop(e)}>
    <input type={'file'} hidden />
    <Outlet />
  </div>
)
}
export default Dropfile