import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SideBar from "@/components/SideBar";
import ResponsiveSideBar from "@/components/ResponsiveSideBar";
import AvatarDashboard from "@/components/AvatarDashboard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Badge } from "@/components/ui/badge";
import LogoDashboard from "@/components/LogoDashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo);

  const filteredUsers = users.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const getUsers = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const openDialog = (id, role) => {
    setSelectedUserId(id);
    setSelectedRole(role);
  };

  const updateRole = () => {
    setIsLoading(true);
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUserId}`,
        { role: selectedRole },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        if (res.data.code === "200") {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUserId
                ? { ...user, role: selectedRole }
                : user
            )
          );
          toast({ description: res.data.message, variant: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <LogoDashboard />
          <SideBar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <ResponsiveSideBar />
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search user"
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          <AvatarDashboard />
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Data Users</h1>
          </div>
          <div
            className="flex flex-col flex-1 border border-dashed rounded-lg shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <Table className="text-white bg-[#868B8E]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] text-white">
                    Profile Picture
                  </TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Phone Number</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <img
                        src={item.profilePictureUrl}
                        alt="profilePicture"
                        className="rounded-lg w-[100px] h-[100px] object-cover"
                      />
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          item.role === "admin" ? "bg-blue-500" : "bg-red-500"
                        }`}
                      >
                        {item.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => openDialog(item.id, item.role)}
                            className="bg-[#B9B7BD]"
                          >
                            Change
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Change Role</DialogTitle>
                            <DialogDescription>
                              Make changes role. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                              <Label htmlFor="role" className="text-right">
                                Role
                              </Label>
                              <Select
                                id="role"
                                value={selectedRole}
                                onValueChange={handleRoleChange}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogClose className="text-right">
                            <Button onClick={updateRole}>
                              {isLoading ? "Loading..." : "Save"}
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ReactPaginate
              className="flex justify-center gap-5 p-3 mx-auto mt-5 w-fit"
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="Prev"
              renderOnZeroPageCount={null}
              activeClassName="text-white"
              pageClassName="text-muted-foreground"
              pageLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
              previousClassName="text-white"
              previousLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
              nextClassName="text-white"
              nextLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
              disabledClassName="text-muted-foreground"
              disabledLinkClassName="text-muted-foreground"
            />
          </div>
        </main>
      </div>
    </div>
  );
};
export default ListUser;
