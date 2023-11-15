import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../css/components/slider.css"
const Slider = () => {
    const link = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAACJCAMAAADUiEkNAAAAM1BMVEXMzMzPz8+Tk5OSkpKWlpa2trbBwcGmpqbHx8fLy8urq6vExMS/v7+enp6ioqK5ubmvr68G4nY0AAADZElEQVR4nO3ZW5OiMBCG4ZwAIQH9/792u3NExfJup2bqfS62GGxmaz7b2AFjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8GdZcX14cfrlul51Lv9Qj2xeRNIjm44Qlls+a6ddjmfbjvf0mmBcGlvLj1qepHwi8A+Sd8FrPPbugwvOa+B2kWM5f9fzm57Phy/XqeAk71zSyqdcvhH4tXk5gst5B8luz/mZmw9h2lwIcjz7sD/ktZfrcn9vUp9GudOQ5Sop9/NP/DG/gY0u5x2926zNwdrJubu1i6ZmN2n5fOL1OnW08qmWm7teOuvv+pG/5heYS94SVDL2oQtKzrikbqysxlY6+DLA1YXDtotK+ebcqp+Vnbw/KHmP0FLOu3e5C7pC52DlnF4wBpd7uVTK1/H2yCKkfU/eH4y819bli9cApVXn2tnSsLqW38JNv0Bbq+sSsppW/siX5s6uL+DKU3/nvAtpVQlNlvWH1WNtWJk8bvbh/VRL3GnZKOXlg6AdH///X/I79LxdrE1ayNQhacqrJW+v36kyfEjXt/6+59eeytey/Dz0o4FL4/ty0oGjNaZmJudTyVvO67ko84s7Lye9i2v5yDtd/FcwPe88RD9kiG4Lb8hrcCrdf5QF2W5hFNgyoNcfSjl5f1XztofTTWKLUMcN3fo85a05SknZ8+tL22lU0aDJ+7uat1kP75fQItR+jeXVvp7Ivt1tNwk8ryI6v/RQdYHXs6zfX7W8jV21ZWuEtV/HfKLfl4uXLWisWeqM2H9J8mVAN8wn3/S8Td2t1KOS2K3lHfLNKP1nLjcCZ1/ekafyOn9v5b4XLpzynn0b8JJ3Ncy8jF9s0HXN6PdUUsu+bP/rOIMrI2+Nqd7/3vtRTnrt8Xe6BeqTyrhwcaGljksj79hXiNzo+TGNBOiMTeMz0MS2YpfyrZZPzs/24u1BM74v+/5F7zdN92ma9I6KZBd7u3d1f/NWrtvMKL+IcfATac4S3OhY+SoM+vRG47e7ztxvD2zs6S2I5/L8OMixnHw0+/w8TTc89amMHBVlpJa5/P35mMwte2/vc7kE7v3B3cHP2uP0l6fz/TG7XaN5b9eXB/KnchNXuhsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAv+weaexeTqtL70QAAAABJRU5ErkJggg==";
    return (
      <Carousel interval={4000} className='slider'>
        <Carousel.Item>
          <img className='d-block w-100' src={link}/>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={link} />
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={link} />
        </Carousel.Item>
      </Carousel>
    );
};

export default Slider;