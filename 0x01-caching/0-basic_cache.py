#!/usr/bin/env python3
"""
BasicCache module
"""

BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    """
    BasicCache class inherits from BaseCaching and implements a simple
    caching system.
    """
    def put(self, key, item):
        """
        Add an item to the cache.

        If key or item is None, this method does nothing.
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """
        Get an item from the cache by key.

        If key is None or if the key doesn't exist in self.cache_data
        return None.
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
