import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { Tasks } from 'components/Tasks/Tasks.jsx';
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from 'variables/Variables.jsx';

class Dashboard extends Component {
  state = {
    total_registered_users: 0,
    total_aliases: 0,
    total_blocked_variants: 0,
    total_coallocatable_variants: 0,
    url: 'https://webmail.bharatdaak.in/services/fetchUserRecords',
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json['names'].length; i++) {
      var type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  }

  componentDidMount() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          total_registered_users: data.total_users,
          total_aliases: data.total_aliases,
          total_blocked_variants: data.total_blocked_variants,
          total_coallocatable_variants: data.total_coallocatable_variants,
        });
      })
      .catch(console.log('Error while fetching user records service data'));
  }

  render() {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa fa-user text-warning' />}
                statsText='Registered Users'
                statsValue={this.state.total_registered_users}
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Updated now'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa fa-users text-success' />}
                statsText='Total Aliases'
                statsValue={this.state.total_aliases}
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Updated now'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa fa-ban text-danger' />}
                statsText='Blocked Variants'
                statsValue={this.state.total_blocked_variants}
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Updated now'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa fa-asterisk text-info' />}
                statsText='Multiple Variants'
                statsValue={this.state.total_coallocatable_variants}
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Updated now'
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon='fa fa-history'
                id='chartHours'
                title='Users Behavior'
                category='24 Hours performance'
                stats='Updated 3 minutes ago'
                content={
                  <div className='ct-chart'>
                    <ChartistGraph
                      data={dataSales}
                      type='Line'
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className='legend'>{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon='fa fa-clock-o'
                title='Email Statistics'
                category='Mailserver Performance'
                stats='Statistics sent 2 days ago'
                content={
                  <div
                    id='chartPreferences'
                    className='ct-chart ct-perfect-fourth'
                  >
                    <ChartistGraph data={dataPie} type='Pie' />
                  </div>
                }
                legend={
                  <div className='legend'>{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id='chartActivity'
                title='Variants'
                category='All users including IDN aliases'
                stats='Data information certified'
                statsIcon='fa fa-check'
                content={
                  <div className='ct-chart'>
                    <ChartistGraph
                      data={dataBar}
                      type='Bar'
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className='legend'>{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title='Tasks'
                category='List'
                stats='Updated 3 minutes ago'
                statsIcon='fa fa-history'
                content={
                  <div className='table-full-width'>
                    <table className='table'>
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
