import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/files';

export default function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    useEffect( () => {
        dispatch(getFiles(currentDir));
    }, [currentDir])
  return (
    <div>
      DISK
    </div>
  )
}
