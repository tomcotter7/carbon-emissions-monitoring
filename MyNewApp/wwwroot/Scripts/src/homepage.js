import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'infinite-react-carousel';
import
{
    Animator, ScrollContainer, ScrollPage, batch, Fade,
    MoveOut, Sticky, Move } from "react-scroll-motion";

const images = [
    'https://i.postimg.cc/CKXG79xK/logo.png',
    'https://i.postimg.cc/nrGFLNCh/datasource-dashboard.png',
    'https://i.postimg.cc/zG1STbzQ/linechart.png',
    'https://i.postimg.cc/tgvBdqmV/data-dashboard.png'
];

class HomePage extends React.Component {
    render() {
        const FadeUp = batch(Fade(), Move(), Sticky());

        return (
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator
                        animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                        <span>
                            <img
                                src={images[0]}
                                style={{
                                    backgroundColor: 'white',
                                    textAlign: 'center'
                                }}
                                height={250}
                                width={750}
                            />

                            <br />
                            <br />

                            <h1 style={{
                                backgroundColor: 'white',
                                textDecoration: 'underline',
                                display: 'table',
                                margin: 'auto',
                                textAlign: 'center',
                                fontFamily: 'sans-serif',
                                fontWeight: 700
                            }}>
                                About This Application
                            </h1>

                            <br />

                            <div style={{
                                backgroundColor: 'white',
                                textAlign: 'center',
                                fontFamily: 'sans-serif'
                            }}>
                                <p style={{
                                    fontSize: 16,
                                    display: 'table',
                                    margin: 'auto'
                                }}>
                                    This application which will allow you to 
                                    analyse carbon emissions. The intention of 
                                    this application is to raise awareness as 
                                    to which machines contribute the best, or 
                                    worst at carbon output, as well as 
                                    analysing live and offline data.

                                    <br />
                                    <br />

                                    Various features in this application will 
                                    aid you to successfully analyse machine 
                                    running on the plant, and from this, you 
                                    will be able to view data to determine how 
                                    effective the machines are running on the 
                                    plant at that moment in time.

                                    <br />
                                    <br />

                                    For more information, please scroll down 
                                    to see brief explanations of how each 
                                    feature can be used to analyse various 
                                    machines active on the power plant.
                                </p>
                            </div>
                        </span>
                    </Animator>
                </ScrollPage>

                <ScrollPage page={1}>
                    <Animator animation={FadeUp}>
                        <span>
                            <h1 style={{
                                textDecoration: 'underline',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                fontFamily: 'sans-serif',
                                display: 'table',
                                margin: 'auto',
                                fontWeight: 700
                            }}>
                                Dashboard
                            </h1>

                            <br />

                            <Slider
                                dots
                                duration={30}
                                arrows={false}
                                autoplay={true}
                                autoplaySpeed={5000}	
                            >
                                <div>
                                    <img
                                        src={images[1]}
                                        style={{
                                            backgroundColor: 'white',
                                            textAlign: 'center'
                                        }}
                                        width={700}
                                        height={250}
                                    />
                                </div>
                                <div>
                                    <img
                                        src={images[2]}
                                        style={{
                                            backgroundColor: 'white',
                                            textAlign: 'center'
                                        }}
                                        width={650}
                                        height={250}
                                    />
                                </div>
                                <div>
                                    <img
                                        src={images[3]}
                                        style={{
                                            backgroundColor: 'white',
                                            textAlign: 'center'
                                        }}
                                        width={700}
                                        height={250}
                                    />
                                </div>
                            </Slider>

                            <br />

                            <div style={{
                                backgroundColor: 'white',
                                textAlign: 'center',
                                fontFamily: 'sans-serif'
                            }}>
                                <p style={{
                                    fontSize: 16,
                                    display: 'table',
                                    margin: 'auto'
                                }}>
                                    The Dashboard can be used to track live 
                                    performance of machines over the past
                                    24-hours. A line graph will be shown to 
                                    show the rate of FLC% over the 24-hr
                                    period.

                                    <br />
                                    <br />

                                    As well as a line graph, a text box will 
                                    display the average FLC% output, the 
                                    power, and the energy used over the 24-hour
                                    period. This will be regularly 
                                    updated so that the current data for the 
                                    machine is being displayed.
                                </p>
                            </div>
                        </span>

                        {
                            /*Will add insights page once actual insights
                             * page has been implemented and functional.
                             */
                        }

                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        );
    }
}

ReactDOM.render(
    <HomePage />,
    document.getElementById('homepage')
);