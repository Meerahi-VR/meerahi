import React, { PureComponent, useEffect } from 'react'
import { arc, pie } from 'd3-shape'

const radius = 45

class AnimatedDonut extends PureComponent {
  componentWillMount() {
    const sum = this.props.data.reduce((a, b, i) => a + b.value, 0)

    this.setState({
      pathLengths: this.props.data.map(({ value }) => ({
        current: value / sum * radius * Math.PI * 2 * 2,
        end: value / sum * radius * Math.PI * 2
      }))
    })
  }

  render() {
    const { data, speed, width } = this.props

    const arcs = pie().value(d => d.value).sort(_ => undefined)(data)
    const drawArc = arc().outerRadius(radius).innerRadius(radius)
    const { pathLengths } = this.state
    const { children } = this.props

    if (pathLengths.every(offset => offset.current <= offset.end)) {
      clearInterval(this.interval)
    }

    
    useEffect(() => {
      window.requestAnimationFrame(() => {
        this.setState(
          ({ pathLengths }) =>
            pathLengths.some(offset => offset.current > offset.end)
              ? {
                  pathLengths: pathLengths.map(
                    (offset, i) =>
                      offset.current > offset.end &&
                        (i === 0 ||
                          pathLengths[i - 1].current <= pathLengths[i - 1].end)
                        ? Object.assign({}, offset, {
                            current: offset.current - speed
                          })
                        : offset
                  )
                }
              : this.state
        )
      })

    })

    return (
      <svg viewBox="0 0 100 100">
        <g transform="translate(50, 50)">
          {arcs.map((arc, i) => (
            <path
              key={i}
              d={drawArc(arc)}
              style={{
                stroke: arc.data.color,
                strokeWidth: width,
                strokeDasharray: pathLengths[i].end * 2 - 1,
                strokeDashoffset: pathLengths[i].current,
                strokeLinecap: 'round',
                strokeWidth: '10px',
                cap : 'round'
              }}
            />
          ))}
          {children}
        </g>
      </svg>
    )
  }
}

AnimatedDonut.defaultProps = {
  data: [
    { value: 50, color: '#ED696C' },
    { value: 10, color: '#f0e387' },
    { value: 30, color: '#d6d6d6' },
    { value: 70, color: '#43b4a1' }
  ],
  speed: 5,
  width: 5
}

export default AnimatedDonut