import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, Stack } from '@mui/material';

import {
  useFindWarehouseByIdQuery,
  useGetWarehouseCapacityQuery
} from '../../api/warehouseApi';
import WarehouseTable from './WarehouseTable';
import WarehouseInfo from './WarehouseInfo';
import WarehouseContext from '../../contexts/warehouseContext';

export default function Warehouse() {

  const [isLoading, setIsloading] = useState(true);

  const location = useLocation();

  const {
    data: thisWarehouse,
    refetch: refetchWarehouse
  } = useFindWarehouseByIdQuery(location.state.warehouseId);

  const {
    data: currentCapacity,
    refetch: refetchCurrentCapacity
  } = useGetWarehouseCapacityQuery(location.state.warehouseId)

  /**
   * on component load, display nothing until data is loaded
   */
  useEffect(() => {
    setIsloading(true);
  }, []);

  /**
   * when the data needs to be refetched,
   * display nothing until the data comes back
   */
  useEffect(() => {
    setIsloading(true);
    refetchWarehouse().then(() => {
      refetchCurrentCapacity().then(() => {
        setIsloading(false);
      })
    })
  }, [location.state?.refetch])

  
  /**
   * display nothing until data is loaded
   */
  if (isLoading) {
    return null;
  }
  
  return (
    <WarehouseContext.Provider value={{thisWarehouse, currentCapacity}}>
      <Stack spacing={2} divider={<Divider />}>
        <WarehouseInfo />
        <WarehouseTable />
      </Stack>
    </WarehouseContext.Provider>
  )
}