function PrintCurvePath({ curveData, points }) {
    const startPoint = curveData[0];
    const endPoint = curveData[1];
    const controlX = curveData[2];
    const controlY = curveData[3];
    return (
        <path
            d={`M ${points[startPoint][0]} ${points[startPoint][1]} 
              Q ${controlX} ${controlY} 
                ${points[endPoint][0]} 
                ${points[endPoint][1]}`}
            fill="none"
            stroke="black"
            strokeWidth="0.1"
        ></path>
    );
}

export default PrintCurvePath;
