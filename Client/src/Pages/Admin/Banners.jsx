import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import API from '../../api/api';
import ImageUploader from '../../Components/ImageUploader';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    IconButton,
    Skeleton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchBanners = async () => {
        try {
            setLoading(true);

            const { data } = await API.get('/api/banner');
            setBanners(data.banners);

        } catch (error) {
            toast.error(error.response.data.message || "Failed to Fetch banners");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleAddBanner = async () => {
        try {
            if(files.length === 0){
                return toast.error("Please upload the image");
            }

            const formData = new FormData();
            formData.append("image", files[0]);

            await API.post('/api/banner', formData, {
                headers: {
                    "Content-Type": "mutipart/form-data"
                }
            });

            toast.success("Banner Added");
            fetchBanners();
            setFiles([]);

        } catch (error) {
            toast.error(error.response.data.message || "Upload Failed");
        }
    }

    const handleDelete = async (id) => {
        try {
            await API.delete(`/api/banner/${id}`);

            toast.success("Banner Deleted");

            fetchBanners();

        } catch (error) {
            toast.error("Delete Failed");
        }
    }

    const handleToggle = async (id) => {
        try {
            await API.put(`api/banner/toggle/${id}`);

            fetchBanners();

        } catch (error) {
            toast.error("Toggle Failed");
        }
    }

    return (
        <div className="min-h-screen bg-[#f4f7fb] p-6">
    
          {/* PAGE HEADER */}
    
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-gray-800">
                  Homepage Banners
                </h1>
    
                <p className="text-gray-500 text-sm mt-1">
                  Manage homepage slider banners dynamically
                </p>
              </div>
            </div>
    
            {/* UPLOAD SECTION */}
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Upload New Banner
              </h2>
    
              <ImageUploader
                files={files}
                setFiles={setFiles}
              />
    
              <button
                onClick={handleAddBanner}
                className="mt-3 px-4! btn-primary font-bold py-2!">
                Upload Banner
              </button>
            </div>
          </div>
    
          {/* TABLE */}
    
          <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
    
            <TableContainer component={Paper} elevation={0}>
    
              <Table>
    
                {/* TABLE HEAD */}
    
                <TableHead
                  sx={{
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <TableRow>
                    <TableCell>
                      <span className="font-bold">Banner</span>
                    </TableCell>
    
                    <TableCell align="center">
                      <span className="font-bold">Preview</span>
                    </TableCell>
    
                    <TableCell align="center">
                      <span className="font-bold">Status</span>
                    </TableCell>
    
                    <TableCell align="center">
                      <span className="font-bold">Created</span>
                    </TableCell>
    
                    <TableCell align="center">
                      <span className="font-bold">Actions</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
    
                {/* TABLE BODY */}
    
                <TableBody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={5}>
                          <Skeleton
                            variant="rounded"
                            height={80}
                            sx={{
                              borderRadius: "16px",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
    
                  ) : banners.length > 0 ? (
    
                    banners.map((banner, index) => (
                      <TableRow
                        key={banner._id}
                        hover
                        sx={{
                          transition: "0.2s",
                          "&:hover": {
                            backgroundColor: "#f8fafc",
                          },
                        }}>
    
                        {/* INDEX */}
    
                        <TableCell width={120}>
                          <div>
                            <p className="font-bold text-gray-800">
                              Banner #{index + 1}
                            </p>
    
                            <p className="text-xs text-gray-400 mt-1">
                              ID: {banner._id.slice(-6)}
                            </p>
                          </div>
                        </TableCell>
    
                        {/* IMAGE */}
    
                        <TableCell align="center">
                          <div className="flex justify-center">
                            <div className="group relative overflow-hidden rounded-2xl w-52 h-24 border border-gray-200">
                              <img
                                src={banner.image}
                                alt="banner"
                                className=" w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-black/10" />
                            </div>
                          </div>
    
                        </TableCell>
                        {/* STATUS */}
                        <TableCell align="center">
                          <div className="flex items-center justify-center gap-2">
                            <Switch
                              checked={banner.isActive}
                              onChange={() => handleToggle(banner._id)}
                            />
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full
                                ${
                                  banner.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {banner.isActive
                                ? "Active"
                                : "Disabled"}
                            </span>
                          </div>
    
                        </TableCell>
    
                        {/* DATE */}
    
                        <TableCell align="center">
                          <span className="text-sm text-gray-600">
                            {new Date(
                              banner.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </TableCell>
    
                        {/* ACTIONS */}
    
                        <TableCell align="center">
                          <IconButton
                            onClick={() =>
                              handleDelete(banner._id)
                            }
                            sx={{
                              backgroundColor: "#fee2e2",
                              "&:hover": {
                                backgroundColor: "#fecaca",
                              },
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: "#dc2626",
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
    
                  ) : (
    
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        align="center"
                      >
                        <div className="py-12">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                            alt="empty"
                            className="w-24 mx-auto opacity-60"
                          />
                          <h2 className="mt-4 text-xl font-bold text-gray-700">
                            No Banners Found
                          </h2>
    
                          <p className="text-gray-400 text-sm mt-1">
                            Upload your first homepage banner
                          </p>
    
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
    
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );
}


export default Banners
