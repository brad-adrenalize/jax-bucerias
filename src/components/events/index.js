import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FaRegClock, FaMusic } from "react-icons/fa"

const Events = () => {
  
  {/* Query Gatsby graphql for band data */}

  const bandData = useStaticQuery(graphql`
    query {
      sundayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Sunday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      mondayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Monday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      tuesdayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Tuesday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      wednesdayBands: allGraphCmsBand(
        filter: {
          timeSlots: { elemMatch: { scheduledDay: { eq: Wednesday } } }
        }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      thursdayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Thursday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      fridayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Friday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
      saturdayBands: allGraphCmsBand(
        filter: { timeSlots: { elemMatch: { scheduledDay: { eq: Saturday } } } }
      ) {
        nodes {
          name
          image {
            gatsbyImageData(quality: 100)
          }
          timeSlots {
            scheduledDay
            scheduledTime
          }
        }
      }
    }
  `)

  const d = new Date()
  let date = d.toDateString()
  let day = d.getDay()

  const iterator = ({ array }) => {
    let iterator = array.values()
    for (let elements of iterator) {
      return elements
    }
  }

  // Statefully toggle between band / event schedules
  const [eventSelected, setEventSelected] = useState("Bands")
  
  // Statefully toggle between days of the week with band schedule
  const [daySelected, setDaySelected] = useState(day)

  
  // On component mount, statefully set wrapper dimensions
  const [eventsWrapperHeight, setEventsWrapperHeight] = useState(0)
  const [eventsWrapperTop, setEventsWrapperTop] = useState(0)

  useEffect(() => {
    if (document.getElementById("eventsHeader") !== null) {
      setEventsWrapperHeight(
        document.getElementById("display").offsetHeight -
          document.getElementById("eventsHeader").offsetHeight -
          20
      )
      setEventsWrapperTop(
        document.getElementById("eventsHeader").offsetHeight + 20
      )
    }
  }, [])

  return (
    <div className="pt-2">
      <div id="eventsHeader" className="flex flex-row items-center px-4">
        <button
          onClick={() => setEventSelected("Bands")}
          className={`text-2xl w-1/2 mr-1 py-1 rounded-md ${
            eventSelected === "Bands"
              ? "bg-red-700 text-white"
              : "bg-white text-black"
          }`}
        >
          <h2>Bands</h2>
        </button>
        <button
          onClick={() => setEventSelected("Events")}
          className={`text-2xl w-1/2 ml-1 py-1 rounded-md ${
            eventSelected === "Events"
              ? "bg-red-700 text-white"
              : "bg-white text-black"
          }`}
        >
          <h2>Special Events</h2>
        </button>
      </div>

      <div
        className="absolute w-full overflow-auto"
        style={{ top: eventsWrapperTop, height: eventsWrapperHeight }}
      >

        {eventSelected === "Bands" ? (

          // Render Band Data For Selected Day

          <>
            <div className="flex flex-col items-center py-2">
              <h2 className="text-5xl text-white leading-none filter drop-shadow-md mt-2">
                Live At Jax
              </h2>
              <h2 className="text-2xl text-red-600 leading-none">{date}</h2>
            </div>

            {day === 0 ? (
              <>
                {bandData.sundayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Sunday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 1 ? (
              <>
                {bandData.mondayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Monday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 2 ? (
              <>
                {bandData.tuesdayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Tuesday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 3 ? (
              <>
                {bandData.wednesdayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Wednesday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 4 ? (
              <>
                {bandData.thursdayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Thursday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 5 ? (
              <>
                {bandData.fridayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Friday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : day === 6 ? (
              <>
                {bandData.saturdayBands.nodes.map(band => {
                  const image = getImage(band.image)
                  const scheduledTime = iterator({
                    array: band.timeSlots.filter(
                      slot => slot.scheduledDay === "Saturday"
                    ),
                  }).scheduledTime
                  return (
                    <div className="w-full flex flex-col items-center my-2">
                      <GatsbyImage
                        className="m-2 rounded-lg"
                        image={image}
                        alt={`${band.name} Live @ Jax!`}
                      />
                      <h2 className="text-3xl text-red-600">{band.name}</h2>
                      <div className="flex flex-row items-center">
                        <FaRegClock className="text-xl mr-2" />
                        <h3 className="text-xl">{scheduledTime}</h3>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : null}
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3xl">Weekly Schedule</h2>
              <div className="flex flex-row items-center w-full mx-2 p-2">
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 0
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(0)}
                >
                  <h2 className="text-xl">S</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 1
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(1)}
                >
                  <h2 className="text-xl">M</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 2
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(2)}
                >
                  <h2 className="text-xl">T</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 3
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(3)}
                >
                  <h2 className="text-xl">W</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 4
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(4)}
                >
                  <h2 className="text-xl">T</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 5
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(5)}
                >
                  <h2 className="text-xl">F</h2>
                </button>
                <button
                  className={`rounded-full w-10 h-10 mx-auto ${
                    daySelected === 6
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => setDaySelected(6)}
                >
                  <h2 className="text-xl">S</h2>
                </button>
              </div>
              <div className="flex flex-col">
                {daySelected === 0 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Sundays</h2>
                    {bandData.sundayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Sunday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 1 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Mondays</h2>
                    {bandData.mondayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Monday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 2 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Tuesdays</h2>
                    {bandData.tuesdayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Tuesday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 3 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Wednesday</h2>
                    {bandData.wednesdayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Wednesday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 4 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Thursdays</h2>
                    {bandData.thursdayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Thursday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 5 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Fridays</h2>
                    {bandData.fridayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Friday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : daySelected === 6 ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl mt-2">Saturdays</h2>
                    {bandData.saturdayBands.nodes.map(band => {
                      const scheduledTime = iterator({
                        array: band.timeSlots.filter(
                          slot => slot.scheduledDay === "Saturday"
                        ),
                      }).scheduledTime
                      return (
                        <div className="flex flex-col py-2">
                          <div className="flex flex-row items-center">
                            <FaMusic className="text-2xl mr-2 leading-none" />
                            <h2 className="text-3xl text-red-600">
                              {band.name}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center">
                            <FaRegClock className="text-xl mr-2 leading-none" />
                            <h2 className="text-xl leading-none">
                              {scheduledTime}
                            </h2>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
                <p className="py-2">
                  For the most recent updates, be sure to check our{" "}
                  <a className="cursor-pointer" href="https://www.facebook.com">
                    Facebook
                  </a>{" "}
                  page.
                </p>
              </div>
            </div>
          </>
        ) : (

          // Render Future Event Data 

          <div className="flex flex-col justify-center items-center">
            Coming Soon!
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
