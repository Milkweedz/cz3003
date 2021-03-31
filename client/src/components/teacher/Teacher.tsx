import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Image, Button, Heading} from "@chakra-ui/react";
import teacherData from './teacherData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                </tr>
            )
            })}
        </tbody>
        </table>
    )
}

    function Teacher() {
        const columns = React.useMemo(
            () => [
            {
                Header: 'Username',
                accessor: 'userName',
            },
            {
                Header: 'Mastery',
                accessor: 'masteryScore',
            },
            ],
            []
        )

        const data = React.useMemo(() => teacherData(10), [])

        return (
            <Styles>
                <Box p={3} textAlign='center'>
                    <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
                </Box>
                <Box my={5} textAlign='center'>
                    <Button type="submit" backgroundColor="teal.300" bgImage="url('/images/sausage.png')" 
                    bgPosition='center' bgSize='112px 45px'>
                        Share Class
                    </Button>
                </Box>
                <Heading textAlign='center' mb='10px'>Students in my class</Heading>
                <Table columns={columns} data={data} />
            </Styles>
    )
}


export default Teacher