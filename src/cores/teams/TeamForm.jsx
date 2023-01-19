import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllEvents } from "../../features/events/eventSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as teamServices from "../../services/team.services";
import { fetchAllEvents } from "../../services/events.services";
import Select from "../../components/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../features/global/globalSlice";
import { FiArrowLeft as Arrow } from "react-icons/fi";

function TeamForm() {
  const events = useSelector((state) => state.events.eventsAll);
  const { userToken } = useSelector((state) => state.auth);

  const eventsOptions = events.map((event) => ({
    id: event.id,
    name: event.eventName,
  }));
  

  const [team, setTeam] = useState({
    name: "",
    myFile: "",
    idEvents: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getOptionsAllEvents = async () => {
      try {
        dispatch(setLoading(true));
        const allEvents = await fetchAllEvents(userToken);
        dispatch(setAllEvents(allEvents.items));
      } catch (error) {
        if (error.response) {
          throw new Error(
            error?.response?.data?.message || "Error desconocido del servidor"
          );
        }toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getOptionsAllEvents();
  }, [dispatch, userToken]);

  const handleChange = (e) => {
    setTeam((team) => ({
      ...team,
      [e.target.name]: e.target.value,
    }));
  };

  const changeEventId = (value) => {
    setTeam((team) => ({
      ...team,
      idEvents: parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await teamServices.editTeam(userToken, team, team.id);
    } else {
      await teamServices.createTeam(userToken, team);
    }
    navigate("/teams");
  };


  return (

    <div className="w-screen h-screen items-center justify-center flex h-full drop-shadow-md">
        <div className="flex md:w-3/4 w-full gap-[20%] md:gap-[22%]">

          <div>
            <Link to="/teams"><Arrow color="#3D405B" size="2.5rem"/></Link>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="bg-[#EAEAEA] rounded-2xl text-black"
          >
            <div>
              <h1 className="text-white text-xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify">
                Equipos
              </h1>
            </div>
            <div className="pt-5 bg-[#F1F1F1] px-5 grid grid-cols-2 gap-x-8 text-[#3D405B] text-lg">
              <div>
                <label htmlFor="name" className="block text-lg font-bold mb-2">
                  Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={team.name}
                  className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-zinc-200"
                  required
                />
              </div>
              <div>
                <Select
                  label={"Competición"}
                  placeholder="Seleccionar competición"
                  options={eventsOptions}
                  value={team.idEvent}
                  onChange={changeEventId}
                />
              </div>
            </div>
            <div>
              <div className=" bg-[#F1F1F1] py-2 px-5">
                  <label className="text-[#3D405B] text-lg font-bold" htmlFor="file_input">
                    Escudo
                  </label>
                <div class="py-2 flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col bg-[#D2D2D2] items-center justify-center w-full pb-7 rounded-lg cursor-pointer hover: bg-[#D9D9D9]"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-8">
                      <p class="text-lg font-bold text-center text-gray-500">
                        Arrastra y suelta el archivo aquí o
                      </p>
                    </div>
                    <input
                      className="text-lg text-gray-100 rounded-2xl w-1/2 cursor-pointer bg-[#c3c3c3]"
                      aria-describedby="file_input_help"
                      name="file_input"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) =>
                        setTeam((team) => ({
                          ...team,
                          myFile: e.target.files[0],
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-2 bg-[#F1F1F1] rounded-b-lg flex justify-center">
              <button className="font-medium h-8 py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl">
                Confirmar
              </button>
            </div>
          </form>
          
        </div>
    </div>

    
  );
}

export default TeamForm;
