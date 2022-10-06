import React, {useState} from 'react';
import {Container} from './style'
import {data} from './data'
const Products = () => {
    const [state, setState] = useState(data)
    const [check, setCheck] = useState(false)
    const [ids, setId] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    var totalPrice = 0
    var totalCount = 0
    const onCheckbox = (e, id) => {
        setCheck(e.target.checked)
        setId(id)
    }   

    const plus = (cart_id) => {
        let res = state.map((item) => cart_id === item.id ? {...item, quantity: item.quantity + 1} : item)
        setState(res)
    }

    const minus = (cart_id) => {
        let res = state.map((item) => cart_id === item.id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item)
        setState(res)
    }
    const onEnter = (e) => {
        setTitle(e.target.value)
        console.log(title);
    }
    const onEnterPrice = (e) => {
        setPrice(e.target.value)
        console.log(price);
    }
    const onAdd = () => {
        const newUser = {
          id: state.length + 1,
          title: title,
          price: price,
          quantity: 1
        }
        const res = [...state, newUser]
        setState(
          res
        )

        console.log(state);
    }
   
    return (
        <Container>
            <Container.Wrapper>
                <Container.Input placeholder='Add an Item...' onChange={onEnter} />
                <Container.Input placeholder='Add an Price...' onChange={onEnterPrice} style={{width: '25%'}}/>
                <Container.Add onClick={onAdd}>Add</Container.Add>
            </Container.Wrapper>
            <Container.Products>
                {
                    state.map((value) => {
                        totalCount += value.quantity
                        totalPrice += value.quantity * value.price
                        return (
                        <Container.Item key={value.id}>
                            <Container.Checkbox type='checkbox' onChange={(e) => onCheckbox(e,value.id)} />
                            <Container.Title check={ids === value.id && check}>{value.title}</Container.Title>
                            <Container.Title check={ids === value.id && check} style={{position: 'absolute', right: '110px'}} >${value.price}</Container.Title>
                            <Container.Box>
                                <Container.Plus onClick={() => plus(value.id)} />
                                    <Container.Count>{value.quantity}</Container.Count>
                                <Container.Minus onClick={() => minus(value.id)} />
                            </Container.Box>
                        </Container.Item>
                    )
                }
                    
                    )
                }
                <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '350px'}}>
                <Container.Total>Total: ${totalPrice}</Container.Total>
                <Container.Total>Total: {totalCount}</Container.Total>

                </div>
            </Container.Products>
        </Container>
    )
}

export default Products