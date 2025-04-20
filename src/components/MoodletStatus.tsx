import { useEffect, useState } from 'react';
// Types.
import { MoodletStatusType } from './types';
// Style
import styles from './MoodletStatus.module.css';

const MOODLET_STATUS: MoodletStatusType = {
  notReq: true,
  req: false,
  current: false,
  completed: false,
};
const COLOR = {
  notReq: '#E2DEED',
  req: '#998DBF',
  current: '#D22D5C',
  completed: '#319B31',
};

export default function MoodletStatus() {
  const [status, setStatus] = useState({ ...MOODLET_STATUS });
  const [color, setColor] = useState(COLOR.notReq);

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    console.log('Right click on body');
    // if status = completed.
    if (status.completed) {
      //   setStatus((prevStat: MoodletStatusType) => ({ ...prevStat, completed: false, req: true }));
      setStatus({ notReq: false, req: true, current: false, completed: false });

      setColor(COLOR.req);
    }

    // if status = notRequires, then make to required and if status = required then make to not required.
    if (status.notReq || status.req) {
      setStatus((prevStat: MoodletStatusType) => ({ current: false, completed: false, notReq: !prevStat.notReq, req: !prevStat.req }));
      setColor((prevState) => (prevState === COLOR.notReq ? COLOR.req : COLOR.notReq));
    }
  };

  const handleLeftClick = (e: MouseEvent) => {
    if (e.button === 0) {
      console.log('Left click on body');

      // if status = required.
      if (status.req) {
        setStatus((prevStat: MoodletStatusType) => ({ ...prevStat, req: false, current: true }));
        setColor(COLOR.current);
      }

      // if status = current, then make to completed and if status = completed then make to current.
      if (status.current || status.completed) {
        // setStatus((prevStat: MoodletStatusType) => ({ ...prevStat, current: !prevStat.notReq, completed: !prevStat.req }));
        setStatus((prevStat: MoodletStatusType) => ({ notReq: false, req: false, current: !prevStat.current, completed: !prevStat.completed }));

        setColor((prevState) => (prevState === COLOR.current ? COLOR.completed : COLOR.current));
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleLeftClick);
    document.body.addEventListener('contextmenu', handleRightClick);

    return () => {
      // Clearning all event Listsners.
      document.body.removeEventListener('click', handleLeftClick);
      document.body.removeEventListener('contextmenu', handleRightClick);
    };
  }, [status]);

  console.log('status', status);

  return (
    <>
      <div className={styles.circle} style={{ backgroundColor: color }}>
        F
      </div>
    </>
  );
}
