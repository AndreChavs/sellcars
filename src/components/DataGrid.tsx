import * as React from 'react';
import Button from '@mui/material/Button';
import {
  GridColDef,  
  DataGrid,  
  GridToolbarContainer,
  GridRenderCellParams,  
} from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import Modal from './interface/modals/Modal';
import Image from 'next/image';
import {useStore} from '@/global/store';
import ModalEditSlide from './interface/modals/ModalEditSlide';
import SlideRequests from '@/functions/requests/slide/slideRequests';

const requestSlides = new SlideRequests('/api/sliders')

function EditToolbar() {
  const [modal, setModal] = React.useState<boolean>(false);
  const handleClick = () => {    
    setModal(!modal)    
  };
  return (
    <>      
      <GridToolbarContainer>
        <Button 
          color="primary"         
          onClick={handleClick}
        >
          Add Slide
        </Button>
      </GridToolbarContainer>
      {modal && <Modal setModal={setModal}/>}
    </>
  );
}

export default function StartEditButtonGrid() {
  const [modalEdit, setModalEdit] = React.useState<boolean>(false)
  const [editData, setEditData] = React.useState<DataGridState | null>(null)
  
  const dataSlide = useStore((state) => state.dataSlide)
  const setDataSlide = useStore((state) => state.setDataSlide)
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'Ordem', 
      width: 90, 
      renderCell:(params) => {        
        const index = dataSlide?.findIndex((item) => {          
          return item.id === params.id
        })    
        return <p>{index + 1}</p>
      }
    },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 100, 
      editable: false,
      renderCell: (params) => {             
        return <Image 
          src={params.value} 
          width={30} 
          height={30}
          alt=''
        />
      } 
    },
    { 
      field: 'imageMobile', 
      headerName: 'Image Mobile', 
      width: 100, 
      editable: false,
      renderCell: (params) => {      
        return <Image 
          src={params.value} 
          width={30} 
          height={30}
          alt=''
        />
      }  
    },
    { 
      field: 'button', 
      headerName: 'Button',     
      editable: false,
      width: 100,
      renderCell: (params) => {        
        return (
          <>
            <Checkbox          
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            checked={params.value}     
            />
          </>        
        )
      } 
    },
    {
      field: 'textButton',
      headerName: 'Text Button',
      type: 'text',
      width: 150,
      editable: false,
    },
    {
      field: 'paragraph',
      headerName: 'Paragrafo',
      type: 'text',
      width: 150,
      editable: false,
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
          const index = dataSlide?.findIndex((item) => {
            return item.id === params.id
          })         
          const result = confirm(`Tem certeza que deseja apagar o item ${index  + 1} da lista ?`)
          if(result && typeof params.id === 'string'){
            await requestSlides.deleteRequest(params.id, setDataSlide)
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
    <div style={{ height: 400, width: '100%' }}>
      {dataSlide && <DataGrid                
        rows={dataSlide}
        columns={columns}
        slots={{
          toolbar: EditToolbar,
        }}        
      />}
      {modalEdit && editData && <ModalEditSlide 
        setModal={setModalEdit} 
        editData={editData}        
      />}
    </div>
  );
}