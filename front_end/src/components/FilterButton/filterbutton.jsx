function FilterButton(props){   //truyền vào id, onSelect
    return (
        <button className={props.className} onClick={() => props.onSelect(props.id)}>
            {props.children}
        </button>
    )
}

export default FilterButton;