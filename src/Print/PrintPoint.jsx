function PrintPoint({ point }) {
    const positionX = point[0];
    const positionY = point[1];
    return <circle cx={positionX} cy={positionY} r="0.1"></circle>;
}

export default PrintPoint;
