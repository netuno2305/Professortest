import styled from 'styled-components'

export const Container = styled.tr`
`

export const TableData = styled.td`
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    background-color: #ccc;
    text-align: center;
`

export const Button = styled.button`
    padding: 5px 10px;
    background-color: ${props => props.theme == 'edit' ? '#5BC0DE' : 'red'};
    border: 0;
    color: #fff;
`