import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useCar } from '@/global/store';
import ModalEditProduto from '../interface/modals/ModalEditProduto';
import ProdutoRequest from '@/functions/requests/produto/produtoRequest';

const requestProdutos = new ProdutoRequest('/api/produtos')

export default function DataGridProdutos() {
  const dataCar = useCar((state) => state.dataCar)
  const setDataCar = useCar((state) => state.setDataCar)
  const [editData, setEditData] = React.useState<DataGridCar | null>(null)
  const [modalEdit, setModalEdit] = React.useState<boolean>(false)
  
  
  React.useEffect(() => {    
    if (dataCar.length >= 0) {
      requestProdutos.getRequest().then((dataJSON) => {        
        if (dataJSON) {
          setDataCar(dataJSON)                
        }
      })
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataCar.length])
  
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90, 
      type:'number',
      editable: false,
    },
    { 
      field: 'marca', 
      headerName: 'Marca', 
      type: 'text', 
      editable: false, 
      width: 100 },
    {
      field: 'modelo',
      headerName: 'Modelo',
      type: 'text',
      width: 150,
      editable: false,
    },
    {
      field: 'ano',
      headerName: 'Ano',
      type: 'text',
      width: 100,
      editable: false,
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      type: 'text',
      width: 100,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Imagem',
      renderCell: (params:GridRenderCellParams) => {
        return <Image 
          src={params.value}
          width={30}
          height={30}
          alt='' 
        />
      },
      width: 100,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params:GridRenderCellParams) => {

        function handleEdit() {          
          setEditData(params.row)
          setModalEdit((modal) => !modal)
        }

        async function handleDelete() { 
          const index = dataCar?.findIndex((item) => {
          return item.id === params.id
          })           
          if (index || index === 0) {
            const result = confirm(`Tem certeza que deseja apagar o item ${index  + 1} da lista ?`)
            if (result && typeof params.id === 'string') {
              await requestProdutos.deleteRequest(params.id, setDataCar)
            }
          }
        }

        return (
          <>            
            <Button onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i></Button>
            <Button onClick={handleDelete}><i className="fa-solid fa-trash"></i></Button>
          </>
        )
      }      
    }
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      {dataCar && <DataGrid 
        rows={dataCar} 
        columns={columns} 
        slots={{ toolbar: GridToolbar }} 
      />}
      {modalEdit && editData && <ModalEditProduto 
        editData={editData} setModal={setModalEdit}
      />}      
    </div>
  );
}



