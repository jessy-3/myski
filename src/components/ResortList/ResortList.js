import styles from './ResortList.module.css';
import {ResortListItem} from './ResortListItem';

export default function ResortList(props) {

    const content = props.resorts?.map((el) =>
      <div key={el.id} data-testid="item-container">
        <ResortListItem item={el} />
      </div>
    );
    return (
      <main className={styles.resortList} data-testid="resort-list">
        {content}
      </main>
    );
  }
