import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const CountBarChart = ({ provinceCity, kind, type }) => {
    const [chartOptions, setChartOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `http://127.0.0.1:8000/pools/count/?province_city=${provinceCity}&kind=${kind}&type=${type}`;
                const response = await axios.get(url);

                // Format data for Highcharts
                const categories = response.data.map(item => item.district);
                const data = response.data.map(item => ({
                    y: item.property_count,
                    name: `${item.property_count} (${item.district})`
                }));

                const options = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: `Số lượng bất động sản cùng loại tại các quận/huyện${provinceCity}`
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Quận/huyện'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Số lượng'
                        }
                    },
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return `${this.y}`;
                                },
                                style: {
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Số lượng',
                        data: data,
                        color: '#75b1ff'
                    }]
                };

                setChartOptions(options);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [provinceCity, kind, type]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bar-chart">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default CountBarChart;
