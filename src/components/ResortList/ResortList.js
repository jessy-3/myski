import styles from './ResortList.module.css';
import {ResortListItem} from './ResortListItem';

export default function ResortList(props) {

    //Handle the Edit event from ResortListItem
    const editItem = (item) => {
      props.setaction("Edit");
      props.setresort(item);
    }

    //Handle the Delete event from ResortListItem
    const deleteItem = (item) => {
      props.setaction("Delete");
      props.setresort(item);
    }

    const content = props.resorts?.map((el) =>
      <div key={el.id} data-testid="item-container">
        <ResortListItem item={el} handleEdit={editItem} handleDelete={deleteItem} />
      </div>
    );
    return (
      <main className={styles.resortList} data-testid="resort-list">
        {content}
      </main>
    );
  }
