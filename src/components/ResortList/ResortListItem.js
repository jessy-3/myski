import styles from './ResortListItem.module.css'
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
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
          <button onClick={()=>{
            dispatch(setMode('Edit'));
            dispatch(setResort(props.item));
          }} data-testid="edit">Edit</button>
          <button onClick={()=>{
            dispatch(setMode('Delete'));
            dispatch(setResort(props.item));            
          }} data-testid="delete">Delete</button>
        </div>
    </div>
  )
}
