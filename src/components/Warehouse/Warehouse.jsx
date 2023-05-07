import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import {
  useFindWarehouseByIdQuery,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetWarehouseCapacityQuery
} from '../../api/warehouseApi';
import WarehouseTable from './WarehouseTable';
import WarehouseInfo from './WarehouseInfo';
import WarehouseContext from '../../contexts/warehouseContext';

export default function Warehouse() {

  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: thisWarehouse,
    refetch: refetchWarehouse
  } = useFindWarehouseByIdQuery(location.state.warehouseId);

  const {
    data: currentCapacity,
    refetch: refetchCurrentCapacity
  } = useGetWarehouseCapacityQuery(location.state.warehouseId)


  useEffect(() => {
    setIsloading(true);
    refetchWarehouse().then(() => {
      refetchCurrentCapacity().then(() => {
        setIsloading(false);
      })
    })
  }, [location.state?.refetch])

  useEffect(() => {
    setIsloading(true);
  }, []);

  if (isLoading) {
    return null;
  }
  
  return (
    <WarehouseContext.Provider value={{thisWarehouse, currentCapacity}}>
      <WarehouseInfo />
      <WarehouseTable warehouseId={thisWarehouse.id}/>
    </WarehouseContext.Provider>
  )
}