import styles from './ResortListItem.module.css'
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteResort,
  setMode,
  setResort,
} from '../../features/resorts/resortsSlice';

export const ResortListItem=(props)=>{
  const dispatch = useDispatch();
  return (
    <div className={styles.resortItem}>
      <div className={styles.resort_list_item_title}>
        <h3>{props.item.name}</h3>
      </div>
      <hr/>
      <div className={styles.resort_list_item_content}>
        <div className={styles.resort_list_item_img_wrap}>
          <img src={props.item.imgsrc} alt={props.item.name} title={props.item.name} width='100%'/>
        </div>
        <div className={styles.resort_list_item_text}>
          <table className={styles.infor_table}>
            <tbody>
              <tr>
                <td>
                  Name: {props.item.name}
                </td>
              </tr>
              <tr>
                <td>
                  Location: {props.item.location}
                </td>
              </tr>
              <tr>
                <td>
                  Number of ski runs: {props.item.num_skiruns}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <div className={styles.resort_list_item_btn}>
          <button  data-testid="edit" onClick={()=>{
            dispatch(setMode('Edit'));
            // console.log("Edit ", props.item);
            dispatch(setResort(props.item));
          }}>Edit</button>
          <button  data-testid="delete" onClick={()=>{
            // dispatch(setMode('Delete'));
            // console.log("Delete ", props.item);
            dispatch(setResort(""));
            dispatch(deleteResort(props.item));
          }}>Delete</button>
        </div>
    </div>
  )
}
