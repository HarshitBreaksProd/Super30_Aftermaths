I booted up a vm with the following docker compose file:

This sets up an NFS server using Docker, which can be used to provide a statically provisioned volume for Kubernetes with a network file storage.

### This is the VM setup to create a PV(Persistent Volume) using NFS (Network File System):

```yaml
version: '3.7'

services:
  nfs-server:
    image: itsthenetwork/nfs-server-alpine:latest
    container_name: nfs-server
    privileged: true
    environment:
      SHARED_DIRECTORY: /exports
    volumes:
      - ./data:/exports:rw
    ports:
      - "2049:2049"
    restart: unless-stopped
```