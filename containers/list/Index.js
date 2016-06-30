import './style.css'
import { Card, Col, Row } from 'antd';
import  d3 from 'd3'
const list = React.createClass({
    getInitialState() {
        return {
            date: ''
        };
    },
    componentDidMount:function(){
        // console.log(ReactDOM.findDOMNode(this.refs.chart));
        //画布大小
        var width = 300;
        var height = 300;

        //在 body 里添加一个 SVG 画布
        var svg = d3.select(".chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        //画布周边的空白
        var padding = {left:30, right:30, top:20, bottom:20};

        //定义一个数组
        var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

        //x轴的比例尺
        var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([0, width - padding.left - padding.right]);

        //y轴的比例尺
        var yScale = d3.scale.linear()
            .domain([0,d3.max(dataset)])
            .range([height - padding.top - padding.bottom, 0]);

        //定义x轴
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        //定义y轴
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        //矩形之间的空白
        var rectPadding = 4;

        //添加矩形元素
        var rects = svg.selectAll(".MyRect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class","MyRect")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function(d,i){
                return xScale(i) + rectPadding/2;
            } )
            .attr("width", xScale.rangeBand() - rectPadding )
            .attr("y",function(d){
                var min = yScale.domain()[0];
                return yScale(min);
            })
            .attr("height", function(d){
                return 0;
            })
            .transition()
            .delay(function(d,i){
                return i * 200;
            })
            .duration(500)
            .ease("linear")
            .attr("y",function(d){
                return yScale(d);
            })
            .attr("height", function(d){
                return height - padding.top - padding.bottom - yScale(d);
            });

        //添加文字元素
        var texts = svg.selectAll(".MyText")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class","MyText")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function(d,i){
                return xScale(i) + rectPadding/2;
            } )
            .attr("dx",function(){
                return (xScale.rangeBand() - rectPadding)/2;
            })
            .attr("dy",function(d){
                return 20;
            })
            .text(function(d){
                return d;
            })
            .attr("y",function(d){
                var min = yScale.domain()[0];
                return yScale(min);
            })
            .transition()
            .delay(function(d,i){
                return i * 20;
            })
            .duration(200)
            .ease("bounce")
            .attr("y",function(d){
                return yScale(d);
            });

        //添加x轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis);

        //添加y轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis);
    },
    render() {
        return <div className="code-box-demo" style={{ padding: '30px' }}>
            <Row>
                <Col span="8">
                    <Card title="患者接待周报" bordered={false}>
                        <div className="chart" ref="chart">

                        </div>
                    </Card>
                </Col>
                <Col span="8">
                    <Card title="卡片标题" bordered={false}>卡片的内容</Card>
                </Col>
                <Col span="8">
                    <Card title="卡片标题" bordered={false}>卡片的内容</Card>
                </Col>
            </Row>
        </div>
    }
});
//关于我们
module.exports = list;