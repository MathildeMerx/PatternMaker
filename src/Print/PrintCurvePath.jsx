function PrintCurvePath({ curveData, points }) {
    const { startPoint, endPoint, controlPoint } = curveData;
    return (
        <path
            d={`M ${points[startPoint][0]} ${points[startPoint][1]} 
              Q ${controlPoint[0]} ${controlPoint[1]} 
                ${points[endPoint][0]} 
                ${points[endPoint][1]}`}
            fill="none"
            stroke="black"
            strokeWidth="0.1"
        ></path>
    );
}

export default PrintCurvePath;
