/**
 * Created by lilei on 2016/5/25.
 */

import {Link, browserHistory} from 'react-router'
import {Button, Form, Input, Row, Col} from 'antd';
import classNames from 'classnames';
import './login.less';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

let Demo = React.createClass({
    getInitialState() {
        return {
            passBarShow: false, // 是否显示密码强度提示条
            rePassBarShow: false,
            passStrength: 'L', // 密码强度
            rePassStrength: 'L',
        };
    },

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            if (Math.round(Math.random() * 100) % 2 == 0) {
                browserHistory.push('/yh/start')
            } else {
                alert('密码错误！');
            }
        });
    },

    getPassStrenth(value, type) {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'pass') {
                this.setState({passBarShow: true, passStrength: strength});
            } else {
                this.setState({rePassBarShow: true, rePassStrength: strength});
            }
        } else {
            if (type === 'pass') {
                this.setState({passBarShow: false});
            } else {
                this.setState({rePassBarShow: false});
            }
        }
    },

    checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'pass');

        if (form.getFieldValue('pass')) {
            form.validateFields(['rePass'], {force: true});
        }

        callback();
    },

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePass');

        if (value && value !== form.getFieldValue('pass')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },

    renderPassStrengthBar(type) {
        const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H',
        });
        const level = {
            L: '低',
            M: '中',
            H: '高',
        };

        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
          <span className="ant-form-text">
            {level[strength]}
          </span>
                </ul>
            </div>
        );
    },

    render() {
        const {getFieldProps} = this.props.form;

        const passProps = getFieldProps('pass', {
            rules: [
                {required: true, whitespace: true, message: '请填写密码'},
                {validator: this.checkPass},
            ],
            onChange: (e) => {
                console.log('你的密码就是这样被盗的：', e.target.value);
            },
        });
        const rePassProps = getFieldProps('rePass', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2,
            }],
        });
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        return (
            <div id="yh-layout" style={{ backgroundColor:'#17181c',overflow:'hidden'}}>
                <canvas width="1366" height="667"></canvas>
                <div id="loginBox">
                    <Form horizontal form={this.props.form}>
                        <Row>
                            <Col span="18">
                                <FormItem
                                    {...formItemLayout}
                                    label="密码：">
                                    <Input {...passProps} type="password"
                                                          onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                          autoComplete="off" id="pass"
                                    />
                                </FormItem>
                            </Col>
                            <Col span="6">
                                {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                            </Col>
                        </Row>

                        <Row>
                            <Col span="18">
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码：">
                                    <Input {...rePassProps} type="password"
                                                            onContextMenu={noop} onPaste={noop} onCopy={noop}
                                                            onCut={noop}
                                                            autoComplete="off" id="rePass"
                                    />
                                </FormItem>
                            </Col>
                            <Col span="6">
                                {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="18">
                                <Col span="18" offset="6">
                                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        var canvas = document.querySelector('canvas'),
            ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;

        var mousePosition = {
            x: 30 * canvas.width / 100,
            y: 30 * canvas.height / 100
        };

        var dots = {
            nb: 250,
            distance: 100,
            d_radius: 150,
            array: []
        };

        function colorValue(min) {
            return Math.floor(Math.random() * 255 + min);
        }

        function createColorStyle(r, g, b) {
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
        }

        function mixComponents(comp1, weight1, comp2, weight2) {
            return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
        }

        function averageColorStyles(dot1, dot2) {
            var color1 = dot1.color,
                color2 = dot2.color;

            var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
                g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
                b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
            return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
        }

        function Color(min) {
            min = min || 0;
            this.r = colorValue(min);
            this.g = colorValue(min);
            this.b = colorValue(min);
            this.style = createColorStyle(this.r, this.g, this.b);
        }

        function Dot() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();

            this.radius = Math.random() * 2;

            this.color = new Color();
        }

        Dot.prototype = {
            draw: function () {
                ctx.beginPath();
                ctx.fillStyle = this.color.style;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };

        function createDots() {
            for (var i = 0; i < dots.nb; i++) {
                dots.array.push(new Dot());
            }
        }

        function moveDots() {
            for (var i = 0; i < dots.nb; i++) {

                var dot = dots.array[i];

                if (dot.y < 0 || dot.y > canvas.height) {
                    dot.vx = dot.vx;
                    dot.vy = -dot.vy;
                }
                else if (dot.x < 0 || dot.x > canvas.width) {
                    dot.vx = -dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        }

        function connectDots() {
            for (var i = 0; i < dots.nb; i++) {
                for (var j = 0; j < dots.nb; j++) {
                    let i_dot = dots.array[i];
                    let j_dot = dots.array[j];

                    if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                            ctx.beginPath();
                            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }

        function drawDots() {
            for (var i = 0; i < dots.nb; i++) {
                var dot = dots.array[i];
                dot.draw();
            }
        }

        function animateDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            moveDots();
            connectDots();
            drawDots();

            requestAnimationFrame(animateDots);
        }
        canvas.addEventListener('mousemove', function (e) {
            mousePosition.x = e.pageX;
            mousePosition.y = e.pageY;
        });
        canvas.addEventListener('mouseleave', function (e) {
            mousePosition.x = canvas.width / 2;
            mousePosition.y = canvas.height / 2;
        });


        createDots();
        requestAnimationFrame(animateDots);
    }
});

var login = createForm()(Demo);


// <Switch onChange={this.changeMode} />
// const login = React.createClass({
//     submit: function(e) {
//         if(Math.round(Math.random()*100)%2==0){
//             browserHistory.push('/yh/start')
//         }else{
//             alert('密码错误！');
//         }
//     },
//     render() {
//         return (
//             <div>
//                 <button onClick={this.submit}>登陆</button>
//             </div>
//         );
//     }
// });

module.exports = login;