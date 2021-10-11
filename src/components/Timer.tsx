import React, { useEffect, useState } from "react";

const Timer = (props: {
    time: number
    context: number | string
    stop: boolean
    setStop: (val:boolean) => void
  }) => {
  const [timer, setTimer] = useState<number>(props.time);
  const [interval, setinterval] = useState<number>()


    useEffect(() => {
        if(props.stop){
            clearTimeout(interval)
        }
    }, [props.stop,interval])
    useEffect(() => {
      if(timer === 0 ){
        props.setStop(true)
      }
      
    }, [timer, props])

    useEffect(() => {
        setTimer(props.time)
        
    }, [props.context, props.time])
  
   let lessthanhalf = (timer/props.time) * 100 <= 15 ? 'text-red-700' : 'text-gray-800'
   

  useEffect(() => {
    let interval: any;
      if(timer > 0){
        interval = setTimeout(() => setTimer(timer - 1), 1000);
        setinterval(interval)
      }
    return () => {
      clearTimeout(interval);
    };
  },[timer]);

  return <div className={lessthanhalf + " inline-blobk absolute top-4 right-4 font-semibold text-5xl"}>{timer}</div>;
};


export default Timer



//export default React.memo(Timer, (prev, next) => prev.time !== next.time);
