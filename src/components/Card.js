const Card = ({children, isFull}) => {
    return(
        <>
            <div className="bg-red-500 p-6">
                {children}
            </div>
        </>
    )
};

export default Card;